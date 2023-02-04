import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IArticle {
  id: string
  date: string
  title: string
}
export interface IFullArticle {
  id: string
  date: string
  title: string
  text: string
}

export interface ArticlesState {
  articles: IArticle[]
  chosenArticle: IFullArticle
  isLoading: boolean
  isError: boolean
  message: any
}

const initialState: ArticlesState = {
  articles: [],
  chosenArticle: {
    id: '',
    date: '',
    title: '',
    text: '',
  },
  isLoading: false,
  isError: false,
  message: '',
}

// Get user news
export const getArticles = createAsyncThunk('articles/get', async (_, thunkAPI) => {
  console.log('getArticles')
  try {
    const res = await fetch(`api/articles`)
    if (res.ok) {
      let json = await res.json()
      return json
    }
  } catch (error: any) {
    console.log(error)
    return thunkAPI.rejectWithValue('Error at getArticles')
  }
})

// Get chosen news
export const getChosenArticle = createAsyncThunk('article/get', async (id: string, thunkAPI) => {
  try {
    const res = await fetch(`api/articles/${id}`)
    if (res.ok) {
      let json = await res.json()
      return json
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue('Error at getArticle')
  }
})

// Reducer
export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    deleteArticle: (state, action: PayloadAction<string>) => {
      const temp = state.articles.filter((elem) => elem.id === action.payload)
      state.articles = temp
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => {
        state.isLoading = true
        state.message = ''
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.isLoading = false
        state.articles = action.payload
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getChosenArticle.pending, (state) => {
        state.isLoading = true
        state.message = ''
      })
      .addCase(getChosenArticle.fulfilled, (state, action) => {
        state.isLoading = false
        state.chosenArticle = action.payload
      })
      .addCase(getChosenArticle.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { deleteArticle } = articlesSlice.actions
export default articlesSlice.reducer
