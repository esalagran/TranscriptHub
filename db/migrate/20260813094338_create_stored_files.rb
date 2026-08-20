class CreateStoredFiles < ActiveRecord::Migration[8.1]
  def change
    create_table :stored_files do |t|
      t.string :name
      t.text :description
      t.references :user, null: false, foreign_key: true
      t.string :file_hash
      t.string :s3_url
      t.string :status, null: false, default: "uploading"
      t.timestamps
    end

    add_index :stored_files, :status
  end
end
