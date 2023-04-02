/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { PropsWithChildren, useEffect } from "react";
import { App, ConfigProvider } from 'antd'
import { MessageInstance } from "antd/es/message/interface";

import styleAPI from '../../../apis/style'
import { insertCustomizedStyles } from '../../../utils/style';
import errorHandling from '../../../utils/errorHandling'
import toastMessage from '../../../utils/toastMessage'
import i18n from "../../../utils/i18n";
import I18nMessageKeys from "../../../utils/I18nMessageKeys";
import { isWebModule } from "../../../utils/webModuleProvider";
import { ErrorBoundary } from "../ErrorBoundary";
import { isRequestError } from "../../../utils/error";

function initStyles() {
  // init load styles
  styleAPI.getStyleBundle().then(styleBundle => {
    insertCustomizedStyles(styleBundle);
  })
}

function initErrorhandling() {
  errorHandling.onHandleError(((err: any) => {
    if (!err) {
      return;
    }

    if (isRequestError(err)) {
      if (!err.response || !err.response.data) {
        toastMessage.error({
          key: I18nMessageKeys.CommonNetWorkErrorText,
        });
        return
      }

      const responseData = err.response.data;
      const messageKey = responseData.messageKey;
      const messagePrams = responseData.messagePrams;
      if (messageKey) {
        toastMessage.error({
          key: messageKey,
          params: messagePrams,
        });
        return;
      }
    }

    toastMessage.error({
      key: I18nMessageKeys.CommonUnknowErrorText,
    });
    // -
  }))
}

function initToastMessage(messageAPI: MessageInstance) {
  toastMessage.onShowToastMessage(async (toastMessageData) => {
    const message = toastMessageData.message;
    const messageDuration = toastMessageData.opts?.duration;

    if (typeof message === 'string') {
      messageAPI[toastMessageData.type](message, messageDuration);
      return;
    }

    await i18n.load();

    const messageText = i18n.formatMessage(message.key, message.params);
    messageAPI[toastMessageData.type](messageText, messageDuration);
  })
}

export function Application(props: PropsWithChildren) {
  const { message } = App.useApp();

  // first inital for the appplication
  useEffect(() => {
    if (isWebModule()) {
      return;
    }

    initStyles();
    initToastMessage(message);
    initErrorhandling();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ErrorBoundary>
      <ConfigProvider>
        <App>
          { props.children }
        </App>
      </ConfigProvider>
    </ErrorBoundary>
  )
}

export default Application;
