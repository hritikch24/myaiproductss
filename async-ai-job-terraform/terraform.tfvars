# ----- Customize per environment -----
aws_region     = "us-east-1"
project_name   = "async-ai-job"
environment    = "dev"
lambda_zip_path = "lambda.zip"

tags = {
  Project     = "async-ai-job"
  ManagedBy   = "terraform"
  Environment = "dev"
}
