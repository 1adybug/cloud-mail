import app from '../hono/hono';
import settingService from '../service/setting-service';

app.post('/temp-resend-config-20260612/:secret', async (c) => {
	const secret = c.req.param('secret');
	if (secret !== c.env.jwt_secret) {
		return c.text('forbidden', 403);
	}

	const { token } = await c.req.json();
	if (!token) {
		return c.text('missing token', 400);
	}

	await settingService.set(c, {
		send: 1,
		resendTokens: {
			'geshu.ai': token
		}
	});

	return c.text('success');
});
