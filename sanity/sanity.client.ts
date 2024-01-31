import { createClient, type ClientConfig } from "@sanity/client";

const currentDate = new Date();
// const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
const formattedDate = new Date().toISOString().slice(0, 10);

const config: ClientConfig = {
  projectId: "oogp23sh",
  dataset: "production",
  // apiVersion: formattedDate,
  // useCdn: false,
};

const client = createClient(config);

// export const revalidate = 60;

export default client;
