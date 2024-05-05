# AWS account-level error log forwarder

An account-level subscription filter that forwards matching logs to an external service.

[ ![CI status](https://github.com/Cloudbourn/scheduler-billing/actions/workflows/deploy.yml/badge.svg) ](https://github.com/Cloudbourn/scheduler-billing/actions/workflows/deploy.yml "View workflow")

## Usage

* Clone this repository
* Create a webhook in Discord
* Place the webhook URL a repository secret named `DISCORD_WEBHOOK_URL`

> [!NOTE]
> If you don't have OIDC authentication set up in your AWS account yet, have a look at [Cloudbourn/github-oidc](https://github.com/Cloudbourn/github-oidc) to get up and running.

* Modify the OIDC `role-to-assume` in [/.github/workflows/deploy-reusable.yml](https://github.com/Cloudbourn/aws-account-error-log-forwarder/blob/253337d7e2750201e9e6530708246cb88fbbbc6b/.github/workflows/deploy-reusable.yml#L32) to one matching you AWS account.
* Modify the `ARTIFACTS_BUCKET` in [/.github/workflows/deploy-reusable.yml](https://github.com/Cloudbourn/aws-account-error-log-forwarder/blob/253337d7e2750201e9e6530708246cb88fbbbc6b/.github/workflows/deploy-reusable.yml#L53) to an S3 bucket you have permissions to put objects in.
* Commit and push your changes; this will deploy the stack to your AWS account.

## Examples

![Screenshot of a Discord message showing JSON-encoded log data and a link to the log stream it originated in](https://i.imgur.com/yY5GXR3.png)
