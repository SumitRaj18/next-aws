pipeline {
  agent any

  environment {
    EC2_HOST = 'ec2-user@ec2-3-110-221-238.ap-south-1.compute.amazonaws.com'
    APP_DIR  = '/home/ec2-user/myapp'
  }

  stages {
    stage('Install') {
      steps { bat 'npm ci' }
    }
    stage('Test') {
      steps { bat 'npm test --if-present' }
    }
    stage('Package') {
      steps {
        bat 'tar --exclude=node_modules --exclude=.git --exclude=app.tar.gz -czf app.tar.gz .'
      }
    }
  stage('Deploy File') {
  steps {
    withCredentials([sshUserPrivateKey(credentialsId: 'ec2-key', keyFileVariable: 'KEY')]) {
      bat '''
        icacls "%KEY%" /inheritance:r /grant:r "SYSTEM:R"
        "C:\\Windows\\System32\\OpenSSH\\scp.exe" -i "%KEY%" -o StrictHostKeyChecking=no app.tar.gz %EC2_HOST%:/tmp/app.tar.gz || exit /b 1
        "C:\\Windows\\System32\\OpenSSH\\ssh.exe" -i "%KEY%" -o StrictHostKeyChecking=no %EC2_HOST% "mkdir -p %APP_DIR% && tar -xzf /tmp/app.tar.gz -C %APP_DIR% && cd %APP_DIR% && npm ci --omit=dev && pm2 startOrRestart ecosystem.config.js --update-env && pm2 save" || exit /b 1
      '''
    }
  }
}
  }
}