import json
import os
import logging
import urllib.request
import urllib.error

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def lambda_handler(event, context):
    """
    SQS-triggered Lambda that processes approved AI jobs.
    Each SQS message should contain:
    {
        "job_id": "unique-id",
        "prompt": "user prompt or task description",
        "callback_url": "(optional) webhook to POST results",
        "metadata": {}
    }
    """
    for record in event.get("Records", []):
        body = json.loads(record["body"])
        job_id = body.get("job_id", "unknown")
        prompt = body.get("prompt", "")
        callback_url = body.get("callback_url")

        logger.info(f"Processing job {job_id}")

        try:
            # ----- Replace this block with your actual AI call -----
            # Example: call OpenAI, Bedrock, SageMaker, etc.
            result = process_ai_job(prompt)
            status = "completed"
            logger.info(f"Job {job_id} completed")
        except Exception as e:
            result = str(e)
            status = "failed"
            logger.error(f"Job {job_id} failed: {e}")

        # Optional: POST result to a callback URL
        if callback_url:
            notify_callback(callback_url, job_id, status, result)

    return {"statusCode": 200, "body": json.dumps({"message": "done"})}


def process_ai_job(prompt: str) -> str:
    """
    Placeholder for AI processing.
    Replace with your actual AI integration:
      - boto3 bedrock-runtime invoke_model()
      - openai.ChatCompletion.create()
      - requests.post() to your own model endpoint
    """
    logger.info(f"AI prompt received: {prompt[:100]}...")

    # Stub response — swap this out
    return f"Processed: {prompt}"


def notify_callback(url: str, job_id: str, status: str, result: str):
    """POST job result to a callback webhook."""
    payload = json.dumps({
        "job_id": job_id,
        "status": status,
        "result": result
    }).encode("utf-8")

    req = urllib.request.Request(
        url,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            logger.info(f"Callback {url} returned {resp.status}")
    except urllib.error.URLError as e:
        logger.error(f"Callback failed: {e}")
