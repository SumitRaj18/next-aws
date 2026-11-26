pipeline {
  agent any
  environment {
    APP_HOST = 'ec2-user@ec2-16-4-26-89.ap-south-1.compute.amazonaws.com'
  }
  stages {
    stage('Deploy') {
      steps {
        withCredentials([sshUserPrivateKey(credentialsId: 'ec2-key', keyFileVariable: 'KEY')]) {
          bat '''
            icacls "%KEY%" /inheritance:r /grant:r "%USERNAME%:R"
            "C:/Program Files/Git/usr/bin/ssh.exe" -i "%KEY%" -o StrictHostKeyChecking=no %APP_HOST% "~/deploy.sh"
          '''
        }
      }
    }
  }
}