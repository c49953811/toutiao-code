import {
  login,
  sendSms,
  getUserInfo,
  addFollow,
  deleteFollow,
  getUserProfile,
  setUserProfile,
  updateUserPhoto
} from './user'
import {
  getComments,
  addCommentLike,
  deleteCommentLike,
  addComment
} from './comment'
import { getSearchSuggestion, getSearchResult } from './search'
import {
  getArticleById,
  addCollect,
  deleteCollect,
  addLike,
  deleteLike
} from './article'
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
export const addFollowAPI = addFollow
export const deleteFollowAPI = deleteFollow
export const getUserProfileAPI = getUserProfile
export const setUserProfileAPI = setUserProfile
export const updateUserPhotoAPI = updateUserPhoto

export const getCommentsAPI = getComments
export const addCommentLikeAPI = addCommentLike
export const deleteCommentLikeAPI = deleteCommentLike
export const addCommentAPI = addComment

export const getSearchSuggestionAPI = getSearchSuggestion
export const getAllChannelsAPI = getAllChannels
export const getArticlesAPI = getArticles
export const getAllChanneAPI = getAllChanne
export const addUserChannelAPI = addUserChannel
export const deleteUserChannelAPI = deleteUserChannel
export const addCollectAPI = addCollect
export const deleteCollectAPI = deleteCollect
export const addLikeAPI = addLike
export const deleteLikeAPI = deleteLike
export const getSearchResultAPI = getSearchResult
export const getArticleByIdAPI = getArticleById
