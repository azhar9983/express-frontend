pipeline {
    agent any

    triggers {
        // Fires on every GitHub push (needs the GitHub webhook -> http://<EC2-IP>:8080/github-webhook/)
        githubPush()
    }

    // Optional: if you configured the NodeJS plugin (Manage Jenkins > Tools), uncomment:
    // tools { nodejs 'NodeJS' }

    environment {
        APP_NAME = 'express-frontend'
        APP_DIR  = '/opt/apps/express-frontend'
        // Optional: sensitive values from Jenkins credentials
        // BACKEND_API_KEY = credentials('backend-api-key')
    }

    stages {
        stage('Pull Latest Code') {
            steps {
                checkout scm
                sh 'git log -1 --pretty="Commit: %h - %s (%an)"'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'node --version && npm --version'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    mkdir -p "$APP_DIR"
                    rsync -a --delete --exclude '.git' --exclude 'node_modules' ./ "$APP_DIR"/
                    cd "$APP_DIR"
                    npm install --omit=dev
                    pm2 startOrRestart ecosystem.config.js --update-env
                    pm2 save
                '''
            }
        }

        stage('Verify') {
            steps {
                sh '''
                    sleep 3
                    curl -fsS http://localhost:3000/health
                '''
            }
        }
    }

    post {
        success { echo 'Express frontend deployed successfully.' }
        failure { echo 'Express pipeline failed - check the console output above.' }
    }
}
