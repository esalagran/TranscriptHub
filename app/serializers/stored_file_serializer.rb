class StoredFileSerializer < ApplicationResource
  attributes :id, :name, :description, :file_hash, :created_at, :updated_at

  typelize "'uploading' | 'processing' | 'available' | 'quarantined' | 'failed' | 'archived' | 'deleted'"
  attribute :status do |stored_file|
    stored_file.status
  end
end