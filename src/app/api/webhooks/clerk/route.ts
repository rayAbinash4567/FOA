import { db } from '@/db/db';
import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';
export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);
  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  const eventType = evt.type;
  // User created
  if (eventType === 'user.created') {
    try {
      await db.user.create({
        data: {
          externalUserId: payload.data.id,
          firstName: payload.data.first_name,
          lastName: payload.data.last_name,
          imageUrl: payload.data.image_url,
        },
      });
      return new Response('User created successfully', {
        status: 200,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      return new Response('Error occurred in creating user', {
        status: 500,
      });
    }
  }

  if (eventType === 'user.updated') {
    try {
      await db.user.update({
        where: {
          externalUserId: payload.data.id,
        },
        data: {
          firstName: payload.data.first_name,
          lastName: payload.data.last_name,
          imageUrl: payload.data.image_url,
        },
      });
      return new Response('User updated successfully', {
        status: 200,
      });
    } catch (error) {
      console.error('Error updating user:', error);
      return new Response('Error occurred in updating user', {
        status: 500,
      });
    }
  }

  // User deleted

  if (eventType === 'user.deleted') {
    try {
      await db.user.delete({
        where: {
          externalUserId: payload.data.id,
        },
      });
      return new Response('User deleted successfully', {
        status: 200,
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      return new Response('Error occurred in deleting user', {
        status: 500,
      });
    }
  }

  // Handle other event types or a default response
  return new Response('Event type not handled', {
    status: 200,
  });
}
