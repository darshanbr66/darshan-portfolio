import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

let gridFSBucket;

export function initializeGridFS() {
  const db = mongoose.connection.db;

  if (!db) {
    throw new Error("MongoDB database connection is not available.");
  }

  gridFSBucket = new GridFSBucket(db, {
    bucketName: "uploads",
  });

  console.log("GridFS initialized successfully");
}

export function getGridFSBucket() {
  if (!gridFSBucket) {
    throw new Error("GridFS has not been initialized.");
  }

  return gridFSBucket;
}