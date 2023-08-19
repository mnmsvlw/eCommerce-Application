import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import ctpClient from './BuildClient';

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: 'ecommerce-application-jsfe2023q1',
});

const getProject = () => {
  return apiRoot.productProjections().get().execute();
};
export default getProject;
