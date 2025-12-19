import { getPayload } from 'payload'
import configPromise from '../payload.config'
import { PROFILE, SERVICES, PROJECTS, PROCESS, TECH_STACK, FAQS, TESTIMONIALS } from './seed-data/constants'

const seed = async () => {
    const payload = await getPayload({ config: configPromise })

    console.log('Seeding database...')

    try {
        // Seed Profile
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
                    })),
                    chartData: project.chartData,
                    coverImage: project.coverImage,
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
            limit: 100,
        })

        if (existingTestimonials.totalDocs > 0) {
            for (const doc of existingTestimonials.docs) {
                await payload.delete({
                    collection: 'testimonials',
                    id: doc.id,
                })
            }
        }

        for (const testimonial of TESTIMONIALS) {
            await payload.create({
                collection: 'testimonials',
                data: {
                    quote: testimonial.quote,
                    author: testimonial.author,
                    role: testimonial.role,
                    company: testimonial.company,
                    authorImage: testimonial.authorImage,
                },
            })
        }

        console.log('Seeding complete!')
        process.exit(0)
    } catch (error) {
        console.error('Error seeding database:', error)
        process.exit(1)
    }
}

seed()
