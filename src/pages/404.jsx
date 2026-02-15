import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const NotFoundPage = () => {
  return (
    <Layout>
      <section className="py-32 text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-8xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Page Not Found
          </h2>
            <img
              src="https://media.giphy.com/media/26n6WywJyh39n1pBu/giphy.gif"
              alt="Lost in space animation"
              width="480"
              height="270"
              className="mx-auto rounded shadow"
            />
          <p className="text-gray-600 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            Go Home
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default NotFoundPage;

export const Head = () => <Seo title="404 - Not Found" />;
