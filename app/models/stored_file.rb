class StoredFile < ApplicationRecord
  belongs_to :user

  enum :status, {
    uploading:   "uploading",
    processing:  "processing",
    available:   "available",
    quarantined: "quarantined",
    failed:      "failed",
    archived:    "archived",
    deleted:     "deleted"
  }, validate: true
end