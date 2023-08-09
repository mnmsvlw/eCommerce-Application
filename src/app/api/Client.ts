import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import ctpClient from './BuildClient';

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: 'ecommerce-application-jsfe2023q1',
});

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
const getProject = () => {
  return apiRoot.productProjections().withId({ ID: 'a1026bea-0222-400d-8cd3-accc3dab775c' }).get().execute();
};
export default getProject;
// Retrieve Project information and output the result to the log
// getProject().then(console.log).catch(console.error);
