class PostsController < ApplicationController
  def index
    all = Post.all_with_comments
    render json: all
  end

  def create
    post = Post.create(allow_params)
    render json: post
  end

  def destroy
    post = Post.find(params[:id])
    post.comments.each {|comment| comment.destroy }
    post.destroy
  end

  private

  def allow_params
    params.require(:post).permit(:title, :description, :image).merge(posted: Time.now.strftime("%m/%d/%Y"))
  end
end