// File: /pages/api/revenuecat.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

// Setup Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key for update access
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const event = req.body
  const userId = event.app_user_id // RevenueCat sends this

  const newTier = event.subscriber?.entitlements?.pro?.expires_date ? 'pro' : 'free'

  try {
    const { error } = await supabase
      .from('users')
      .update({ tier: newTier })
      .eq('id', userId)

    if (error) {
      console.error('Supabase update error:', error)
      return res.status(500).json({ error: 'Failed to update user tier' })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Webhook handling error:', err)
    return res.status(500).json({ error: 'Server error' })
  }
}
