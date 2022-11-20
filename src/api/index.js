import { login, sendSms, getUserInfo } from './user'
import { getSearchSuggestion, getSearchResult } from './search'
import {
  getAllChannels,
  getArticles,
  getAllChanne,
  addUserChannel,
  deleteUserChannel
} from './channel'
export const loginAPI = login
export const sendSmsAPI = sendSms
export const getUserInfoAPI = getUserInfo
export const getSearchSuggestionAPI = getSearchSuggestion
export const getAllChannelsAPI = getAllChannels
export const getArticlesAPI = getArticles
export const getAllChanneAPI = getAllChanne
export const addUserChannelAPI = addUserChannel
export const deleteUserChannelAPI = deleteUserChannel
export const getSearchResultAPI = getSearchResult
