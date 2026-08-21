class FileUploaderController < ApplicationController
  before_action :set_stored_file, only: %i[update destroy]
  wrap_parameters :stored_file, include: %i[name description]

  def index
    files = StoredFileSerializer.new(Current.user.stored_files.visible.order(created_at: :desc))

    render inertia: "Files/Index", props: {
      files: files.to_h()
    }
    end

  def create
    @stored_file = Current.user.stored_files.new(stored_file_params)
    if @stored_file.save
      redirect_to files_path, notice: "File created."
    else
      redirect_to files_path, alert: "Failed to create file.", inertia: { errors: @stored_file.errors }
    end
  end

  def update
    if @stored_file.update(stored_file_params)
      redirect_to files_path, notice: "File updated."
    else
      redirect_to files_path, alert: "Failed to update file.", inertia: { errors: @stored_file.errors }
    end
  end

  def destroy
    if @stored_file.update(status: :deleted)
      redirect_to files_path, notice: "File deleted."
    else
      redirect_to files_path, alert: "Failed to delete file.", inertia: { errors: @stored_file.errors }
    end
  end

  private

    def set_stored_file
      @stored_file = Current.user.stored_files.visible.find(params[:id])
    end

    def stored_file_params
      params.require(:stored_file).permit(:name, :description)
    end
end
