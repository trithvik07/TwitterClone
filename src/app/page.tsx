import Header from "./[Comps]/Header";
import Form from "./[Comps]/Form";
import PostFeed from "./[Comps]/posts/PostFeed";

export default function Home() {
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's happening" />
      <PostFeed />
    </>
  )
}
