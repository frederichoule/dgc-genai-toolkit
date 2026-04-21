<script lang="ts">
	interface Props {
		title: string;
		description: string;
		href: string;
		bg: 'bg-brand-lime' | 'bg-brand-mint' | 'bg-brand-spring';
		image: string;
	}

	let { title, description, href, bg, image }: Props = $props();

	let webpSrc = $derived(image.replace(/\.(jpe?g|png)$/i, '.webp'));
</script>

<a
	{href}
	class="group {bg} flex h-60 items-end justify-between overflow-hidden opacity-90 transition-opacity duration-300 hover:opacity-100 md:h-[22rem]"
>
	<div class="flex h-full items-end p-8">
		<div class="text-black">
			<p class="text-2xl font-semibold leading-snug md:text-[2rem]">{title}</p>
			<p class="text-2xl leading-snug md:text-[2rem]">{description}</p>
		</div>
	</div>
	<div class="relative hidden h-full w-2/5 shrink-0 md:block">
		<picture>
			<source srcset={webpSrc} type="image/webp" />
			<img
				src={image}
				alt=""
				class="absolute inset-0 h-full w-full object-cover grayscale"
				loading="lazy"
				decoding="async"
			/>
		</picture>
		<div class="absolute inset-0 {bg} opacity-60 mix-blend-multiply"></div>
	</div>
</a>
