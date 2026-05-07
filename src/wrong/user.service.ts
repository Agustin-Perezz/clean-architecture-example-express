import { User } from "./user.entity.js";
import { UserRepository } from "./user.repository.js";
import { Response } from "express";

export class UserService {
  private repository: UserRepository;
  private emailQueue: string[] = [];

  constructor() {
    this.repository = new UserRepository();
  }

  async getAll(): Promise<Response> {
    const users = await this.repository.findAll();
    return this.formatResponse(users, 200);
  }

  async getById(id: number): Promise<Response> {
    const user = await this.repository.findById(id);
    if (!user) return this.errorResponse("User not found", 404);
    return this.formatResponse(user, 200);
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<Response> {
    if (!this.validateName(data.name)) {
      return this.errorResponse("Invalid name", 400);
    }
    if (!this.validateEmail(data.email)) {
      return this.errorResponse("Invalid email", 400);
    }
    if (!this.validatePassword(data.password)) {
      return this.errorResponse("Password must be at least 8 characters", 400);
    }
    const existing = await this.repository.findByEmail(data.email);
    if (existing) {
      return this.errorResponse("Email already in use", 409);
    }
    const user = new User();
    user.id = Date.now();
    user.name = data.name;
    user.email = data.email;
    user.password = data.password;
    await this.repository.create(user);
    this.queueWelcomeEmail(data.email);
    return this.formatResponse(user, 201);
  }

  async update(id: number, data: Partial<User>): Promise<Response> {
    const user = await this.repository.findById(id);
    if (!user) return this.errorResponse("User not found", 404);
    if (data.email && !this.validateEmail(data.email)) {
      return this.errorResponse("Invalid email format", 400);
    }
    const result = await this.repository.update(id, data);
    return this.formatResponse(result, 200);
  }

  async delete(id: number): Promise<Response> {
    const success = await this.repository.delete(id);
    if (!success) return this.errorResponse("User not found", 404);
    return this.formatResponse({ deleted: true }, 204);
  }

  async authenticate(
    email: string,
    password: string,
  ): Promise<{ status: number; json: Record<string, unknown> }> {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      return { status: 401, json: { error: "Invalid credentials" } };
    }
    const isValid = await this.repository.authenticate(email, password);
    if (!isValid) {
      return { status: 401, json: { error: "Invalid credentials" } };
    }
    return {
      status: 200,
      json: { token: `token_${user.id}_${Date.now()}`, userId: user.id },
    };
  }

  private validateName(name: string): boolean {
    return name.length >= 2 && name.length <= 100;
  }

  private validateEmail(email: string): boolean {
    return email.includes("@") && email.length > 5;
  }

  private validatePassword(password: string): boolean {
    return password.length >= 8;
  }

  private formatResponse(data: unknown, status: number): Response {
    const res = {
      statusCode: status,
      json: (body: unknown) => ({ status, body }),
    } as unknown as Response;
    res.status = () => res;
    return res;
  }

  private errorResponse(message: string, status: number): Response {
    return this.formatResponse({ error: message }, status);
  }

  private queueWelcomeEmail(email: string): void {
    this.emailQueue.push(email);
    console.log(
      `Email queued for ${email}. Queue size: ${this.emailQueue.length}`,
    );
  }

  async processEmailQueue(): Promise<void> {
    while (this.emailQueue.length > 0) {
      const email = this.emailQueue.shift();
      console.log(`Sending email to ${email}`);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
}
