class CommentsController < ApplicationController

  def index
    all = Comment.all
    render json: all
  end
end