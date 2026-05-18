import OpenAI from "openai"
import { z } from "zod"
import { zodResponseFormat } from "openai/helpers/zod"

const FormattedTranscriptSchema = z.object({
    roleLearningDevelopment: z
        .array(z.string())
        .describe(
            "Bullet points about the employee's role, learning, professional growth, training, skills development, work experience, and career aspirations"
        ),
    concernsConsiderations: z
        .array(z.string())
        .describe(
            "Bullet points about concerns, issues, challenges, problems faced, salary concerns, work-life balance issues, infrastructure problems, and areas needing attention"
        ),
    suggestionsAppreciations: z
        .array(z.string())
        .describe(
            "Bullet points about suggestions for improvement, appreciations, positive feedback, recommendations, and things the employee values or would like to see changed"
        ),
})

export type FormattedTranscript = z.infer<typeof FormattedTranscriptSchema>

export async function POST(request: Request) {
    try {
        let { transcription, openAIAPIKey } = await request.json()

        if (!transcription) {
            return Response.json(
                { message: "Missing transcription or API key" },
                { status: 400 }
            )
        }

        if (!openAIAPIKey) {
            openAIAPIKey = process.env.OPENAI_API_KEY
        }

        const openai = new OpenAI({ apiKey: openAIAPIKey })

        const completion = await openai.chat.completions.parse({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `You are an HR assistant that analyzes one-on-one employee meeting transcripts and extracts structured bullet points into exactly three categories.

**ROLE & LEARNING DEVELOPMENT**: Extract points about the employee's role, learning, professional growth, training, skills development, work experience, mentorship, career aspirations, workload comfort, and team dynamics.
Example bullet points:
1. "Good mentoring from my manager, Vignesh at my 1st month of training"
2. "Management is good & there is no bias between the employees"
3. "Time Flexibility"
4. "Has handled 3 projects since joining, completed a year, become more mature and capable"
5. "Wants to learn system design and deploy it"

**CONCERNS / CONSIDERATIONS**: Extract points about concerns, issues, challenges, salary delays, work-life balance problems, infrastructure issues, communication gaps, and areas needing management attention.
Example bullet points:
1. "Salary delay, at least management should communicate the date of salary issuance"
2. "Package/hike would be better for my role"
3. "Work Life Balancing is a very big challenge"
4. "Insufficient KT about the product"

**SUGGESTIONS / APPRECIATIONS**: Extract points about suggestions for improvement, appreciations, positive feedback, recommendations, and things the employee values.
Example bullet points:
1. "Install a System monitor tool for getting accurate logs"
2. "Office infrastructure improvements such as AC installation have enhanced the work environment"
3. "Fixed Date for Salary (better to know to plan my commitments)"
4. "Plan for Team lunch"

Keep each bullet point concise but informative. The bullet points need to be numbered. Preserve the employee's voice and specific details. If a category has no relevant content in the transcript, return an empty array for that category.`,
                },
                {
                    role: "user",
                    content: `Please analyze the following one-on-one meeting transcript and extract bullet points into the three categories:\n\n${transcription}`,
                },
            ],
            response_format: zodResponseFormat(
                FormattedTranscriptSchema,
                "formattedTranscript"
            ),
        })

        const parsed = completion.choices[0].message.parsed

        if (!parsed) {
            return Response.json(
                { message: "Failed to parse structured output from OpenAI" },
                { status: 500 }
            )
        }

        return Response.json({ formattedTranscript: parsed })
    } catch (error: unknown) {
        console.error("Format API error:", error)
        const message =
            error instanceof Error ? error.message : "An unknown error occurred"
        return Response.json({ message }, { status: 500 })
    }
}
