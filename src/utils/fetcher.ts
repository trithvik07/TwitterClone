import axios from "axios";

const fetcher = async (url: string) => {
  const result = await axios.get(url);
  return result.data;
};

export default fetcher;
