import { GetStaticProps, InferGetStaticPropsType } from "next";

import { createSwaggerSpec } from "next-swagger-doc";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const ApiDoc = ({ spec }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <SwaggerUI spec={spec} />;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const spec: Record<string, any> = createSwaggerSpec({
    title: "100vh",
    version: "0.0.1",
  });
  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;
