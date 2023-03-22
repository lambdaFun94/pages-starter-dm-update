/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */
import * as React from "react";
import { fetch } from "@yext/pages/util";
import "../index.css";
import {
  Template,
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TransformProps,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import { ExternalImage } from "../types/ExternalImage";
import Favicon from "../assets/images/yext-favicon.ico";

export const config: TemplateConfig = {
  name: "turtlehead-tacos",
};

export const getPath: GetPath<ExternalImageData> = () => {
  return `index.html`;
};


type ExternalImageData = TemplateProps & { externalImage: ExternalImage };

export const transformProps: TransformProps<ExternalImageData> = async (
  data
) => {
  const url = YEXT_PUBLIC_EXTERNAL_IMAGE_API_BASE_URL + "/2";
  const externalImage = (await fetch(url).then((res: any) =>
    res.json()
  )) as ExternalImage;
  return { ...data, externalImage };
};

type ExternalImageRenderData = TemplateRenderProps & {
  externalImage: ExternalImage;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = (): HeadConfig => {
  return {
    title: "Static Page Example",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: "Static page example meta description.",
        },
      },
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: Favicon,
        },
      },
    ],
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct result from `transformProps`.
 */
const Static: Template<ExternalImageRenderData> = ({
  externalImage,
}) => {
  return (
    <>
      <PageLayout>
        <div className="centered-container">
          <div className="bg-red-900 text-5xl font-bold text-white p-10 flex items-center justify-center flex-col gap-x-14 gap-y-10 md:flex-row">
            <h1>Welcome to Turtlehead Tacos</h1>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Static;
