import FBSDK from 'react-native-fbsdk';
import {
  SHARE_FB_LINK_WITH_COMMENT_DEFINED_BY_THE_USER,
  SHARE_FB_LINK_WITH_COMMENT_DEFINED_BY_THE_USER_SUCCESS,
  SHARE_FB_LINK_WITH_COMMENT_DEFINED_BY_THE_USER_FAIL,
  SHARE_FB_LINK_WITH_COMMENT_DEFINED_BY_THE_USER_CANCELLED,
  SHARE_FB_LINK_WITH_PREDEFINED_COMMENT,
  SHARE_FB_LINK_WITH_PREDEFINED_COMMENT_SUCCESS,
  SHARE_FB_LINK_WITH_PREDEFINED_COMMENT_FAIL,
  SEND_FB_APP_INVITE,
  SEND_FB_APP_INVITE_SUCCESS,
  SEND_FB_APP_INVITE_FAIL,
  SEND_FB_APP_INVITE_CANCELLED
} from './types';

const {
  ShareDialog,
  ShareApi,
  AppInviteDialog
} = FBSDK;

const shareLinkContent = {
    contentType: `link`,
    contentUrl: `https://skydreamer.io/`,
    contentDescription: `Come visit us!` // change related to i18n
};

const appInviteContent = {
    applinkUrl: `https://fb.me/253439161770978`,
    previewImageUrl: `https://skydreamer.io/img/white_logo.png`
};

const shareFacebookLinkWithCommentDefinedByTheUserFail = error => ({
    type: SHARE_FB_LINK_WITH_COMMENT_DEFINED_BY_THE_USER_FAIL,
    error
});

const shareFacebookLinkWithCommentDefinedByTheUserSuccess = result => ({
    type: SHARE_FB_LINK_WITH_COMMENT_DEFINED_BY_THE_USER_SUCCESS,
    result
});

const shareFacebookLinkWithCommentDefinedByTheUserCancelled = () => ({
    type: SHARE_FB_LINK_WITH_COMMENT_DEFINED_BY_THE_USER_CANCELLED
});

/**
 * Shares something in the user's diary. The user can also decide
 * to add a comment before posting.
 * https://developers.facebook.com/docs/react-native/sharing
 */
export const shareFacebookLinkWithCommentDefinedByTheUser = () => (
  (dispatch) => {
      dispatch({ type: SHARE_FB_LINK_WITH_COMMENT_DEFINED_BY_THE_USER });
      console.log(`shareFacebookLinkWithCommentDefinedByTheUser dispatch`, dispatch);
      ShareDialog.canShow(this.state.shareLinkContent)
    .then(canShow => canShow && ShareDialog.show(shareLinkContent))
    .then((result, error) => {
        if (error) {
            dispatch(shareFacebookLinkWithCommentDefinedByTheUserFail(error));
        }
        if (result.isCancelled) {
            console.log(`Share operation was cancelled`);
            dispatch(shareFacebookLinkWithCommentDefinedByTheUserCancelled());
        } else {
            console.log(`Share was successful with postId: `, result.postId);
            dispatch(shareFacebookLinkWithCommentDefinedByTheUserSuccess(result));
        }
    });
  }
);

const shareFacebookLinkWithPrefinedCommentFail = error => ({
    type: SHARE_FB_LINK_WITH_PREDEFINED_COMMENT_FAIL,
    error
});

const shareFacebookLinkWithPrefinedCommentSuccess = result => ({
    type: SHARE_FB_LINK_WITH_PREDEFINED_COMMENT_SUCCESS,
    result
});

/**
 * Basically the same as shareFacebookLinkWithCommentDefinedByTheUser,
 * except that this method accepts a predefined comment as a parameter,
 * which isn't editable by the user.
 * https://developers.facebook.com/docs/react-native/sharing
 */
export const shareFacebookLinkWithPrefinedComment = message => (
  (dispatch) => {
      dispatch({ type: SHARE_FB_LINK_WITH_PREDEFINED_COMMENT });
      console.log(`shareFacebookLinkWithPrefinedComment dispatch`, dispatch);
      ShareApi.canShare(this.state.shareLinkContent)
    .then(canShare => canShare && ShareApi.share(shareLinkContent, `/me`, message))
    .then((result, error) => {
        if (error) {
            dispatch(shareFacebookLinkWithPrefinedCommentFail(error));
        }
        if (result) {
            console.log(`Share was successful with postId`, result.postId);
            dispatch(shareFacebookLinkWithPrefinedCommentSuccess(result));
        }
    });
  }
);

const sendFacebookAppInviteFail = error => ({
    type: SEND_FB_APP_INVITE_FAIL,
    error
});

const sendFacebookAppInviteSuccess = result => ({
    type: SEND_FB_APP_INVITE_SUCCESS,
    result
});

const sendFacebookAppInviteCancelled = () => ({
    type: SEND_FB_APP_INVITE_CANCELLED
});

/**
 * Allows the user to send an invite to some friends.
 * It seems that we can't retrieve the invited users' list.
 * Also, this react native API is not documented at the moment.
 */
export const sendFacebookAppInvite = () => (
  (dispatch) => {
      dispatch({ type: SEND_FB_APP_INVITE });
      console.log(`sendFacebookAppInvite dispatch`);
      AppInviteDialog.canShow(appInviteContent)
    .then(canShow => canShow && AppInviteDialog.show(appInviteContent))
    .then((result, error) => {
        console.log(`inside body of sendFacebookAppInvite`);
        if (error) {
            console.log(`error at sendFacebookAppInvite`);
            dispatch(sendFacebookAppInviteFail(error));
        }
        if (result.isCancelled) {
            console.log(`appInvite operation was cancelled`);
            dispatch(sendFacebookAppInviteCancelled());
        } else {
            console.log(`appInvite was successful: `, result);
            dispatch(sendFacebookAppInviteSuccess(result));
        }
    });
  }
);
