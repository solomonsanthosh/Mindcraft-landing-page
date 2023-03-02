interface Post {
  _id: String;

  topic: String;
  owner: String;

  title: String;

  content: String;

  comments: [String];

  created_at: Date;
  updatedAt: Date;

  __v: Number;
}
export default Post;
