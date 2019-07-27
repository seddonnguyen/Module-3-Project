class Post < ApplicationRecord
  has_many :comments

  def self.all_with_comments
    self.all.map do |post|
      {
        id: post.id,
        posted: post.posted,
        title: post.title,
        description: post.description,
        image: post.image,
        comments: post.comments
      }
    end
  end
end
