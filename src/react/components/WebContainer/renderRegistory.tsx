import React, { ElementType, FunctionComponent } from "react";

export enum RenderTypes {
  HTML = "html",
  Markdown = "markdown",
  RichText = "richText",
  WebModule = "webModule",
  None = 'none'
}

export interface RenderComponentProps {
  url: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>
  onStart?: () => void
  onLoad?: () => void
  onError?: () => void
}

function DefaultRender() {
  return <></>
}

type RenderComponentType = FunctionComponent<RenderComponentProps>;
export type RenderElement = ElementType<RenderComponentProps>;

const renderMapper: Record<string, RenderComponentType> = {} as  any;

export function registerRender(key: RenderTypes, component: any) {
  renderMapper[key] = component;
}

export function getRegisteredRender(key: RenderTypes):RenderComponentType {
  return renderMapper[key] ?? DefaultRender;
}
