# Forum API Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Key Concepts](#key-concepts)

## Project Overview

This project is a REST API for a forum, designed using **Domain-Driven Design (DDD)** and **Clean Architecture** principles. The goal is to create a modular, maintainable, and scalable application that effectively models the business domain of a forum.

## Architecture

The application follows a layered architecture, separating concerns into the following layers:

- **Domain Layer**: Contains core business logic, entities, value objects, and domain events.
- **Application Layer**: Manages application logic, use cases, and interacts with the domain layer.
- **Infrastructure Layer**: Handles data access, external services, and persistence.
- **Interface Layer**: Exposes the API endpoints for client interaction.


## Key Concepts

### Domain-Driven Design (DDD)

- **Domain**: The specific area of knowledge or activity the software addresses.
- **Domain Experts**: Individuals with expertise in the domain providing insights during development.
- **Ubiquitous Language**: A shared language used by both developers and domain experts.
  
### Entities and Value Objects

- **Entities**: Objects with a distinct identity that persists over time.
- **Value Objects**: Descriptive aspects of the domain without unique identity.

### Aggregates

Groups of related entities treated as a single unit for data consistency.

### Domain Events

Notifications indicating that something significant has occurred within the domain.

### Subdomains (Bounded Contexts)

Distinct areas within the overall domain modeled independently.
