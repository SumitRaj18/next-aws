pipeline {
  agent any
  environment {
    APP_HOST = 'ec2-16-4-26-89.ap-south-1.compute.amazonaws.com'
    APP_DIR  = '/var/www/nextapp'
  }
  stages {
    stage('Install') { steps { sh 'npm ci' } }
    stage('Build') {
      steps {
        sh 'npm run build'
        sh 'rm -rf .next/standalone/.next/static && cp -r .next/static .next/standalone/.next/static'
        sh '[ -d public ] && cp -r public .next/standalone/public || true'
      }
    }
    stage('Deploy') {
      steps {
        sshagent(credentials: ['ec2-key']) {
          sh '''
            rsync -az --delete --exclude .env \
              -e "ssh -o StrictHostKeyChecking=no" \
              .next/standalone/ $APP_HOST:$APP_DIR/
            ssh -o StrictHostKeyChecking=no $APP_HOST "cd $APP_DIR && \
              (pm2 restart next-aws --update-env || \
               PORT=3000 HOSTNAME=127.0.0.1 pm2 start server.js --name next-aws) && pm2 save"
          '''
        }
      }
    }
  }
}