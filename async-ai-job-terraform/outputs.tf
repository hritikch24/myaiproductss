output "sqs_queue_url" {
  description = "URL of the AI job SQS queue"
  value       = aws_sqs_queue.ai_job_queue.url
}

output "sqs_queue_arn" {
  description = "ARN of the AI job SQS queue"
  value       = aws_sqs_queue.ai_job_queue.arn
}

output "sqs_dlq_url" {
  description = "URL of the dead-letter queue"
  value       = aws_sqs_queue.ai_job_dlq.url
}

output "lambda_function_name" {
  description = "Name of the Lambda function"
  value       = aws_lambda_function.ai_job_processor.function_name
}

output "lambda_function_arn" {
  description = "ARN of the Lambda function"
  value       = aws_lambda_function.ai_job_processor.arn
}

output "lambda_role_arn" {
  description = "ARN of the Lambda execution role"
  value       = aws_iam_role.lambda_role.arn
}
