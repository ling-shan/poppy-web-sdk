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
import { ErrorBoundary } from "../ErrorBoundary";
import { isRequestError } from "../../../utils/error";
import appENV from "../../../utils/appEnv";
import { ReactElement } from "react-markdown/lib/react-markdown";

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

function AppInitLayer(props: PropsWithChildren) {
  const { message } = App.useApp();
  // first inital for the appplication
  useEffect(() => {
    if (appENV.webModule) {
      return;
    }
    initStyles();
    initToastMessage(message);
    initErrorhandling();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return props.children as ReactElement
}

export function Application(props: PropsWithChildren) {
  return (
    <ErrorBoundary>
      <ConfigProvider>
        <App>
          <AppInitLayer>
            { props.children }
          </AppInitLayer>
        </App>
      </ConfigProvider>
    </ErrorBoundary>
  )
}

export default Application;
