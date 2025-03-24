pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'
    }
    
    environment {
        DOCKER_IMAGE = "cyborden/genai"
    }

    stages {
        
        stage("Generate Version") {
            steps {
                script {
                    env.RELEASE_VERSION = sh(script: "/usr/local/bin/jx-release-version", returnStdout: true).trim()
                    echo "Generated Version: ${env.RELEASE_VERSION}"
                }
            }
        }

        stage("Project Building") {
            steps {
                git branch: 'main', url: 'https://github.com/denmgarcia/genai'
                sh 'npm install'
            }
        }
        
        stage("Docker Building") {
            steps {
                echo "===Building Docker Image==="
                echo "Building Docker image with tag: ${env.RELEASE_VERSION}"
                sh "docker build -t ${DOCKER_IMAGE}:${env.RELEASE_VERSION} ."
                sh "docker tag ${DOCKER_IMAGE}:${env.RELEASE_VERSION} ${DOCKER_IMAGE}:latest"
                echo "===Build Complete==="
            }
        }
        
        stage("Docker Push") {
            steps {
               script {
                   withCredentials([string(credentialsId: 'dockerhub', variable: 'DOCKER_PASS')]) {
                        sh "docker login -u cyborden -p ${DOCKER_PASS}"
                        sh "docker push ${DOCKER_IMAGE}:${env.RELEASE_VERSION}"
                   }
               }
            }
        }
    }
}
