export interface File {
    /** Contents of the file. */
    fileContent: string;
    /** Name of the file. */
    fileName: string;
    /** Size of the file in KB. */
    fileSize: number;
    /** MIME type of the file. */
    mimeType: string;
}

export interface OpenFileOptions {
    /**
     * 1. Open the file.
     * 2. Save the file.
     */
    openMode: 1 | 2;
}