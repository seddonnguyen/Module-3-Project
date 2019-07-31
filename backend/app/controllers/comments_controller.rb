class CommentsController < ApplicationController

  def index
    all = Comment.all
    render json: all
  end

  def create
    comment = Comment.create(allow_params)
  end

  private

  def allow_params
    params.require(:comment).permit(:post_id, :content)
  end
end