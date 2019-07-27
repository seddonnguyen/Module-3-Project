class PostsController < ApplicationController
  def index
    all = Post.all_with_comments
    render json: all
  end
end