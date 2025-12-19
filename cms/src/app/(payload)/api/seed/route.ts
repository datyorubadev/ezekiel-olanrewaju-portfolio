import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'
import { PROFILE, SERVICES, PROJECTS, PROCESS, TECH_STACK, FAQS, TESTIMONIALS } from '../../../../seed-data/constants'

export async function GET() {
    console.log('Starting seed request...')
    const payload = await getPayload({ config: configPromise })
    console.log('Payload retrieved.')

    try {
        // Seed Profile
        console.log('Seeding Profile...')
        const existingProfile = await payload.find({
            collection: 'profile',
            limit: 1,
        })

        if (existingProfile.totalDocs === 0) {
            await payload.create({
                collection: 'profile',
                data: {
                    name: PROFILE.name,
                    role: PROFILE.role,
                    headline: PROFILE.headline,
                    subheadline: PROFILE.subheadline,
                    email: PROFILE.email,
                    social: PROFILE.social,
                },
            })
        }

        // Seed Hero
        const existingHero = await payload.find({
            collection: 'hero',
            limit: 1,
        })

        if (existingHero.totalDocs === 0) {
            await payload.create({
                collection: 'hero',
                data: {
                    role: 'AI & AUTOMATION SPECIALIST',
                    headline: 'Building LLM-powered workflows, RAG systems, and automations that actually ship.',
                    subheadline: 'I help startups and agencies integrate robust AI operations, moving beyond hype to measurable efficiency.',
                },
            })
        }

        // Seed About
        const existingAbout = await payload.find({
            collection: 'about',
            limit: 1,
        })

        if (existingAbout.totalDocs === 0) {
            await payload.create({
                collection: 'about',
                data: {
                    content: 'I bridge the gap between abstract AI capabilities and concrete business value. With a background in software engineering and a deep focus on the emerging LLM stack, I help organizations move past the "demo phase" into production-grade systems.',
                    expertise: [
                        {
                            title: 'Technical Mastery',
                            description: "Pro-level implementation of RAG pipelines, Vector DBs, and fine-tuning. I don't just use APIs; I architect resilient systems around them.",
                        },
                        {
                            title: 'Strategic Integration',
                            description: 'Understanding where AI adds value and where it adds risk. I prioritize ROI and operational stability over hype.',
                        },
                    ],
                },
            })
        }

        // Seed Services
        const existingServices = await payload.find({
            collection: 'services',
            limit: 1,
        })

        if (existingServices.totalDocs === 0) {
            for (const [index, service] of SERVICES.entries()) {
                await payload.create({
                    collection: 'services',
                    data: {
                        title: service.title,
                        description: service.description,
                        tags: service.tags.map((tag: string) => ({ tag })),
                        order: index + 1,
                    },
                })
            }
        }

        // Seed Projects
        // Delete existing projects first to ensure clean slate with new schema
        const existingProjects = await payload.find({
            collection: 'projects',
            limit: 100,
        })

        if (existingProjects.totalDocs > 0) {
            for (const doc of existingProjects.docs) {
                await payload.delete({
                    collection: 'projects',
                    id: doc.id,
                })
            }
        }

        for (const project of PROJECTS) {
            await payload.create({
                collection: 'projects',
                data: {
                    title: project.title,
                    slug: project.slug,
                    summary: project.summary,
                    client: project.client,
                    year: parseInt(project.year),
                    tags: project.tags.map((tag: string) => ({ tag })),
                    description: project.description,
                    problem: project.problem,
                    solution: project.solution,
                    metrics: project.metrics.map((m: any) => ({
                        name: m.label,
                        value: m.value,
                        description: m.description,
                    })),
                    chartData: project.chartData,
                    coverImage: project.coverImage, // Now mapping to text field
                },
            })
        }

        // Seed Process Steps
        const existingProcess = await payload.find({
            collection: 'process-steps',
            limit: 1,
        })

        if (existingProcess.totalDocs === 0) {
            for (const step of PROCESS) {
                await payload.create({
                    collection: 'process-steps',
                    data: {
                        stepNumber: parseInt(step.number),
                        title: step.title,
                        description: step.description,
                    },
                })
            }
        }

        // Seed Tech Stack
        const existingStack = await payload.find({
            collection: 'tech-stack',
            limit: 1,
        })

        if (existingStack.totalDocs === 0) {
            await payload.create({
                collection: 'tech-stack',
                data: {
                    tools: TECH_STACK.map((tool: string) => ({ tool })),
                },
            })
        }

        // Seed FAQs
        const existingFAQs = await payload.find({
            collection: 'faqs',
            limit: 1,
        })

        if (existingFAQs.totalDocs === 0) {
            for (const faq of FAQS) {
                await payload.create({
                    collection: 'faqs',
                    data: {
                        question: faq.question,
                        answer: faq.answer,
                    },
                })
            }
        }

        // Seed Testimonials
        const existingTestimonials = await payload.find({
            collection: 'testimonials',
            limit: 1,
        })

        if (existingTestimonials.totalDocs === 0) {
            for (const testimonial of TESTIMONIALS) {
                await payload.create({
                    collection: 'testimonials',
                    data: {
                        quote: testimonial.quote,
                        author: testimonial.author,
                        role: testimonial.role,
                        company: testimonial.company,
                    },
                })
            }
        }

        return NextResponse.json({ success: true, message: 'Database seeded successfully' })
    } catch (error) {
        console.error('Error seeding database:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}
