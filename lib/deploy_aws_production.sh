timestamp() {
  date +"%s"
}

aws s3 sync ./public/ s3://meshweb/`timestamp`