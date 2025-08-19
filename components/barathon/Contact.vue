<template>
  <div class="max-w-lg mx-auto mb-8">
    <form action="" target="_blank" class="space-y-4 bg-white p-6 rounded-lg shadow">
      <!-- Name -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          name="Name"
          required
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>

      <!-- Email -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="Email"
          required
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>

      <!-- Subject -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
        <input
          type="text"
          name="Subject"
          required
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>

      <!-- Message -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea
          name="Message"
          rows="4"
          required
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        ></textarea>
      </div>

      <!-- Button -->
      <button
        type="submit"
        class="w-full bg-black text-white py-2 rounded-md shadow hover:bg-gray-800 transition"
      >
        Send
      </button>
    </form>
  </div>
</template>
