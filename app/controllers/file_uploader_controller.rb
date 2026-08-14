class FileUploaderController < ApplicationController
  def index
      files = StoredFile.order(created_at: :desc)

      render inertia: "Files/Index", props: {
        files: files.as_json(
          only: %i[id name description status file_hash user_id created_at updated_at]
        )
      }
    end

    def new
      render inertia: "Files/Index"
    end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end
end
