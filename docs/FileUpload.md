# File Upload

The purpose of this document is to define the requirements for integrating a file upload system into the TranscriptHub application.

## Use Cases

1. As a user, I want to upload a file so that I can add it to the TranscriptHub platform.
2. As a user, I want to see a list of my uploaded files so that I can manage them.
3. As a user, I want to edit the metadata of a file so that I can keep its information up to date.
4. As a user, I want to archive a file so that I can remove it from my active files.
5. As a user, I want to permanently delete an archived file so that I can remove it from the TranscriptHub platform.
6. As a user, I want to download or preview a file so that I can view its contents.

## Definitions

### Duplicate File

A duplicate file is a file with the same content as an existing file owned by the same user, regardless of its filename.

### Stale Upload

An upload is considered stale if it has remained in the UPLOADING state for more than 24 hours.

Stale uploads shall be automatically deleted.

## File States

### UPLOADING

The file is currently being transferred to TranscriptHub. The file is not available to the user.

### PROCESSING

The file has been completely uploaded and is undergoing the required validation and processing before it can become available. This may include:

- File-format validation
- Malware scanning
- Hash calculation
- Duplicate detection
- Content processing

The file is not available to the user while it is being processed.

### AVAILABLE

The file has successfully completed all required validation and processing and can be accessed by the user.

### FAILED

The file could not be successfully processed after the configured number of processing attempts. The file is not available for download or preview.

### QUARANTINED

The file has been identified as potentially malicious or otherwise unsafe. The file is not available for download, preview, or further processing.

### ARCHIVED

The file is no longer part of the user's active files but is retained and can be permanently deleted by the user.

### DELETED

The file has been marked for deletion and is no longer accessible to the user.

## Functional Requirements

### Upload

1. The system shall support uploading files of up to 3 GiB.

2. The system shall allow users to upload empty files.

3. The system shall support only the file formats listed in the Supported Formats section. Files whose format is not listed shall be rejected.

4. The system shall determine the file format using the file content and/or a validated MIME type and shall not rely solely on the file extension.

5. The system shall generate a cryptographic content hash for each successfully uploaded file.

6. The system shall display upload progress to the user while a file is being uploaded.

7. The user shall be able to cancel an upload at any time.

8. If an upload is interrupted by a temporary failure, the system shall allow the user to resume the upload from the last successfully uploaded portion.

9. Resuming an upload is only required while the upload session remains active. The system is not required to resume an upload after the user closes or terminates the browser session.

10. A cancelled upload shall not become available to the user.

11. The system shall reject uploads that exceed the configured maximum file size.

12. The system shall consider an upload stale if it remains in the UPLOADING state for more than 24 hours and shall automatically delete it.

### Duplicate Detection

13. The system shall detect duplicate files based on the user's identity and the file's content hash.

14. Filename shall not be used to determine whether two files are duplicates.

15. If a user uploads a duplicate file, the system shall reject the upload and inform the user that the file already exists.

16. Files with different content shall not be considered duplicates, even if they have the same filename.

### File Validation and Processing

17. A file shall not be considered AVAILABLE unless its corresponding physical file exists and is accessible.

18. Uploaded files shall be scanned for malware before they become available for download or preview.

19. Files identified as malicious shall enter the QUARANTINED state and shall not be downloadable, previewable, or processed further.

20. If malware scanning fails due to a system or scanner error, the file shall remain unavailable and the system shall retry the scan according to the configured retry policy.

21. If the configured retry limit is reached without a successful malware scan, the file shall enter the FAILED state and shall remain unavailable for download or preview.

22. If required file processing fails after the configured number of processing attempts, the file shall enter the FAILED state and shall remain unavailable for download or preview.

### File Access

23. A user shall only be able to list, view, modify, download, preview, archive, or delete files they own.

24. A file shall not be accessible to another user unless explicit file-sharing functionality is introduced in the future.

### File List

25. The system shall allow users to view a list of files they own.

26. The file list shall display the following information:

- Name
- Size
- Date uploaded
- Description
- State

27. The system shall paginate the file list, with a maximum of 100 files per page.

### Filtering

28. The system shall allow users to filter their files by name, file size, and upload date.

#### Name Filtering

29. Name filtering shall be case-insensitive and shall return files whose names contain the specified search text.

Example:

    Search: meeting

    meeting.mp3        ✓
    Meeting-final.txt  ✓
    MEETING.wav        ✓
    report.mp3         ✗

#### File Size Filtering

30. Users shall be able to filter files by minimum and maximum file size.

Example:

    Minimum: 100 KB
    Maximum: 10 MB

31. Either the minimum or maximum file size may be omitted.

#### Date Filtering

32. Users shall be able to filter files by upload date using a start date and/or end date.

Example:

    From: 2026-01-01
    To:   2026-12-31

33. Either the start date or end date may be omitted.

#### Combined Filters

34. When multiple filters are specified, the system shall return only files matching all specified filters.

Example:

    Name contains: meeting
    Size:           100 MB–1 GB
    Date:            August 2026

The result shall contain only files that satisfy all three conditions.

### File Metadata

35. The system shall maintain the following metadata for each file:

- Name
- Size
- Date uploaded
- Description
- Content hash

36. Only the name and description shall be editable by the user.

37. The following metadata shall be generated and maintained by the system and shall not be editable by the user:

- Size
- Date uploaded
- Content hash
- File state

### Metadata Validation

38. The system shall validate metadata before accepting metadata changes.

39. A filename shall not be empty.

40. A filename shall not exceed the configured maximum filename length.

41. A description may be empty.

42. A description shall not exceed the configured maximum description length.

43. The system shall reject metadata containing unsupported or invalid values.

44. Filenames shall support Unicode characters.

### Filename Uniqueness

45. Filenames shall be unique among the active files owned by the same user.

46. Two files with the same filename shall be considered different files if their content is different.

47. If a user attempts to rename a file to a filename that is already used by another active file they own, the system shall reject the rename operation and inform the user that the filename is already in use.

### Archive and Delete

48. Users shall be able to archive their files.

49. Archived files shall remain retained by the system but shall no longer appear in the user's active file list.

50. Only files in the ARCHIVED state may be permanently deleted by the user.

51. A user shall not be able to permanently delete an AVAILABLE, PROCESSING, FAILED, QUARANTINED, or UPLOADING file directly.

52. A deleted file shall no longer be accessible to the user.

### Download and Preview

53. Users shall be able to download files in the AVAILABLE state.

54. Users shall be able to preview files in the AVAILABLE state when the file format supports previewing.

55. Files in UPLOADING, PROCESSING, FAILED, QUARANTINED, or DELETED states shall not be available for download or preview.

## Supported Formats

The system shall support the following file formats:

| Category | Format         | Extension | MIME Type |
|----------|----------------|-----------|-----------|
| Text     | Plain text     | `.txt`    | `text/plain` |
| Text     | Markdown       | `.md`     | `text/markdown` |
| Text     | CSV            | `.csv`    | `text/csv` |
| Text     | JSON           | `.json`   | `application/json` |
| Text     | PDF            | `.pdf`    | `application/pdf` |
| Text     | Microsoft Word | `.docx`   | `application/vnd.openxmlformats-officedocument.wordprocessingml.document` |
| Audio    | MPEG Audio     | `.mp3`    | `audio/mpeg` |
| Audio    | WAV            | `.wav`    | `audio/wav` |
| Audio    | MPEG-4 Audio   | `.m4a`    | `audio/mp4` |
| Audio    | FLAC           | `.flac`   | `audio/flac` |
| Audio    | Ogg Audio      | `.ogg`    | `audio/ogg` |
| Audio    | AAC            | `.aac`    | `audio/aac` |

Files whose format is not listed in this table shall be rejected.

## File State Transitions

| Current State | Event | Next State |
|---------------|-------|------------|
| UPLOADING | Upload completes | PROCESSING |
| UPLOADING | User cancels upload | DELETED |
| UPLOADING | Upload remains inactive for more than 24 hours | DELETED |
| PROCESSING | All validation and processing succeeds | AVAILABLE |
| PROCESSING | Malware detected | QUARANTINED |
| PROCESSING | Processing fails after retry limit | FAILED |
| AVAILABLE | User archives file | ARCHIVED |
| FAILED | User archives file | ARCHIVED |
| QUARANTINED | User archives file | ARCHIVED |
| ARCHIVED | User permanently deletes file | DELETED |

A file shall not transition to AVAILABLE until all required validation, malware scanning, duplicate detection, and processing have completed successfully.

## Non-Functional Requirements

### Performance

1. The system shall support a sustained aggregate server-side upload throughput of at least 1 GiB/minute across all active uploads.
2. The system shall support at least 10 concurrent active uploads while maintaining the required upload throughput.
3. The upload system shall not require the complete file to be loaded into application memory at once.
4. File metadata operations, including listing, filtering, renaming, archiving, and deletion, shall complete within 2 seconds for at least 95% of requests under normal system load.
5. The system shall provide upload progress updates to the client at least every 2 seconds while an upload is active.

### Reliability
6. Interrupted uploads shall be resumable without requiring successfully transferred data to be uploaded again.
7. The system shall not expose partially uploaded or incompletely processed files as AVAILABLE.
8. Transient failures during file processing or malware scanning shall be retried according to the configured retry policy.
9. A failure during upload, processing, or scanning shall not result in a file being incorrectly marked as AVAILABLE.

### Data Integrity
10. The content hash stored for a file shall correspond to the actual contents of the stored file.
11. The system shall verify that an uploaded file is complete and uncorrupted before making it AVAILABLE.
12. File metadata and its corresponding physical file shall remain consistent.

### Availability
13. The file upload and file management functionality shall maintain at least 99.9% monthly availability.

### Scalability
14. The system shall support at least 10 concurrent uploads of files up to 3 GiB without exceeding the defined performance requirements.
15. The system shall support at least 10,000 files per user without exceeding the defined file-list and filtering performance requirements.

### Security
16. All file transfers shall be encrypted in transit using TLS.
17. Stored files shall be encrypted at rest using the organization's approved encryption mechanism.
18. Authorization shall be enforced for every operation involving a file, including listing, viewing, downloading, previewing, modifying, archiving, and deleting.
19. The system shall prevent a user from accessing another user's files by manipulating file identifiers, URLs, API parameters, or other client-controlled values.
20. Uploaded files shall never be executed by the application or its processing components.
21. The system shall validate file content independently of the filename extension.

### Storage and Resource Management
22. The system shall protect AVAILABLE files against loss caused by an individual storage-component failure.
23. Temporary data created during upload, processing, and malware scanning shall be automatically cleaned up when it is no longer required.
24. Cancelled, failed, and stale uploads shall not retain temporary storage indefinitely.
25. The system shall enforce configurable limits for concurrent uploads, processing retries, processing duration, and temporary storage.
26. Permanently deleted files shall no longer be accessible through the application or its supported APIs.

### Observability
27. The system shall record sufficient information to trace the lifecycle of each file from upload through processing, availability, archiving, and deletion.
28. The system shall expose metrics for:
    - Upload duration
    - Upload throughput
    - Active uploads
    - Failed uploads
    - Processing failures
    - Malware-scanning failures
29. The system shall log failures occurring during upload, processing, malware scanning, and storage operations without logging file contents.

### Recovery
30. The system shall have a Recovery Point Objective (RPO) of 1 hour.
31. The system shall have a Recovery Time Objective (RTO) of 4 hours.
32. Following a system failure, files and metadata successfully stored before the recovery point shall be recoverable within the defined RPO and RTO.

## Out of Scope

1. Editing the contents of a file directly within TranscriptHub.
2. Users must download a file and edit its contents locally.
3. Sending files by email from TranscriptHub.
4. Sharing files with other TranscriptHub users.
5. Sharing files with users outside TranscriptHub.