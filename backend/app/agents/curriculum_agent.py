"""
Simple Curriculum Generation Agent - Prototype

This is a minimal implementation to demonstrate the agentic AI approach.
"""

import os
import json
from anthropic import Anthropic
from typing import Optional, Dict, Any


class CurriculumAgent:
    """
    Prototype curriculum generation agent using Claude
    """

    def __init__(self):
        api_key = os.getenv("ANTHROPIC_API_KEY")
        if not api_key:
            raise ValueError("ANTHROPIC_API_KEY environment variable not set")

        self.client = Anthropic(api_key=api_key)
        self.model = "claude-opus-4-20250514"

    async def generate_curriculum(
        self,
        subject: str,
        grade_level: Optional[str] = None,
        standards: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Generate curriculum structure for a subject

        Returns a structured curriculum with domains and topics
        """

        # Build context
        context_parts = [f"Subject: {subject}"]
        if grade_level:
            context_parts.append(f"Grade Level: {grade_level}")
        else:
            context_parts.append("Grade Level: Not specified (create grade-agnostic content)")
        if standards:
            context_parts.append(f"Standards: {standards}")

        context = "\n".join(context_parts)

        # Define the tool for structured output
        tools = [{
            "name": "create_curriculum_plan",
            "description": "Create a structured curriculum plan with domains and topics",
            "input_schema": {
                "type": "object",
                "properties": {
                    "domains": {
                        "type": "array",
                        "description": "List of major topic areas (domains) in the curriculum",
                        "items": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "description": "Name of the domain"
                                },
                                "slug": {
                                    "type": "string",
                                    "description": "URL-friendly slug (lowercase, hyphens)"
                                },
                                "description": {
                                    "type": "string",
                                    "description": "Brief description of what this domain covers"
                                },
                                "level": {
                                    "type": "string",
                                    "enum": ["beginner", "intermediate", "advanced", "expert"],
                                    "description": "Difficulty level of this domain"
                                },
                                "topics": {
                                    "type": "array",
                                    "description": "List of specific topics within this domain",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "name": {
                                                "type": "string",
                                                "description": "Name of the topic"
                                            },
                                            "slug": {
                                                "type": "string",
                                                "description": "URL-friendly slug"
                                            },
                                            "learning_objectives": {
                                                "type": "array",
                                                "items": {"type": "string"},
                                                "description": "What students will learn"
                                            },
                                            "estimated_time_minutes": {
                                                "type": "integer",
                                                "description": "Estimated time to complete this topic"
                                            },
                                            "prerequisites": {
                                                "type": "array",
                                                "items": {"type": "string"},
                                                "description": "Topics that should be completed first"
                                            }
                                        },
                                        "required": ["name", "slug", "learning_objectives", "estimated_time_minutes"]
                                    }
                                }
                            },
                            "required": ["name", "slug", "description", "level", "topics"]
                        }
                    }
                },
                "required": ["domains"]
            }
        }]

        # System prompt
        system_prompt = """You are a curriculum design expert. Your task is to create a comprehensive,
        well-structured curriculum for the given subject.

        Guidelines:
        - Create 3-5 major domains (topic areas)
        - Each domain should have 3-8 specific topics
        - Order domains and topics logically (beginner to advanced)
        - Ensure clear learning objectives for each topic
        - Consider prerequisites and build knowledge progressively
        - If grade level is specified, tailor difficulty to that grade
        - If no grade level, create content suitable for motivated learners

        Use the create_curriculum_plan tool to structure your output."""

        # User message
        user_message = f"""Create a comprehensive curriculum for:

{context}

Please design a complete curriculum with clear structure, appropriate difficulty progression,
and well-defined learning objectives for each topic."""

        print(f"🤖 Agent: Planning curriculum for {subject}...")

        # Call Claude with tool use
        response = self.client.messages.create(
            model=self.model,
            max_tokens=4096,
            system=system_prompt,
            messages=[{
                "role": "user",
                "content": user_message
            }],
            tools=tools
        )

        # Extract tool use from response
        curriculum_data = None
        for content_block in response.content:
            if content_block.type == "tool_use" and content_block.name == "create_curriculum_plan":
                curriculum_data = content_block.input
                break

        if not curriculum_data:
            raise ValueError("Agent did not return structured curriculum data")

        # Calculate statistics
        total_domains = len(curriculum_data['domains'])
        total_topics = sum(len(domain['topics']) for domain in curriculum_data['domains'])

        result = {
            "subject": subject,
            "grade_level": grade_level,
            "standards": standards,
            "curriculum": curriculum_data['domains'],
            "stats": {
                "total_domains": total_domains,
                "total_topics": total_topics
            },
            "tokens_used": response.usage.input_tokens + response.usage.output_tokens
        }

        print(f"✅ Generated curriculum: {total_domains} domains, {total_topics} topics")

        return result


# Sync wrapper for testing
def generate_curriculum_sync(subject: str, grade_level: Optional[str] = None, standards: Optional[str] = None):
    """Synchronous wrapper for testing"""
    import asyncio
    agent = CurriculumAgent()
    return asyncio.run(agent.generate_curriculum(subject, grade_level, standards))
