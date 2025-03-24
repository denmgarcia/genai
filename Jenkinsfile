pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'
    }
    
    environment {
        DOCKER_IMAGE = "cyborden/genai"
        BUILD_TAG = "v1.0.${BUILD_NUMBER}"
    }

    stages {å
        stage("Project Building") {
            steps {
                git branch: 'main', url: 'https://github.com/denmgarcia/genai'
                sh 'npm install'
            }
        }
        
        stage("Docker Building") {
            steps {
                echo "Building Docker image with tag: ${BUILD_TAG}"
                sh "docker build -t ${DOCKER_IMAGE}:${BUILD_TAG} ."
                sh "docker tag ${DOCKER_IMAGE}:${BUILD_TAG} ${DOCKER_IMAGE}:latest"
            }
        }
        
        stage("Docker Push") {
            steps {
               script {
                   withCredentials([string(credentialsId: 'dockerhub', variable: 'DOCKER_PASS')]) {
                        sh "docker login -u cyborden -p ${DOCKER_PASS}"
                        sh "docker push ${DOCKER_IMAGE}:${BUILD_TAG}"
                   }
               }
            }
        }
    }
}
