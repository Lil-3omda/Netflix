import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AiChatbotComponent } from './ai-chatbot.component';
import { ChatApiService } from '../../services/chat-api.service';
import { AuthService } from '../../../../core/services/auth.service';

describe('AiChatbotComponent', () => {
  let component: AiChatbotComponent;
  let fixture: ComponentFixture<AiChatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiChatbotComponent, HttpClientTestingModule],
      providers: [ChatApiService, AuthService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle chatbot visibility', () => {
    expect(component.isOpen).toBeFalsy();
    component.toggleChatbot();
    expect(component.isOpen).toBeTruthy();
  });
});